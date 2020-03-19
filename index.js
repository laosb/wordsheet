const { get } = require('axios')
const { groupBy } = require('lodash')
const fs = require('fs')

const config = require('./config')

const getWord = async word => {
  try {
    const entry = fs.readFileSync(`words/${word}.json`, 'utf-8')
    const data = JSON.parse(entry)
    return data
  } catch (e) {
    const { data } = await get(
      `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${config.KEY_LEARNER}`
    )
    fs.writeFileSync(`words/${word}.json`, JSON.stringify(data[0], null, 2))
    return data[0]
  }
}

const getEntry = async word => {
  if (word.trim() === '') return null
  const data = await getWord(word)
  if (data.fl !== 'verb' && data.fl !== 'adjective') return null
  let gram = ((data.gram || '') + '\n').replace(/more \~; most \~/g, '')
  if (gram === '\n') gram = ''
  return {
    text:
      `${word}\n` +
      `${data.fl}, ` +
      (data.ins
        ? data.ins
            .filter(ins => ins.if)
            .map(ins =>
              ins.il
                ? `${ins.il.replace(/\*/g, '')} ${ins.if.replace(/\*/g, '')}`
                : `${ins.if.replace(/\*/g, '')}`
            )
            .join(', ')
        : '') +
      '\n' +
      gram +
      data.shortdef.map(def => `· ${def}\n`).join('') +
      '\n',
    type: data.fl
  }
}

const main = async () => {
  const list = fs.readFileSync('words.txt', 'utf-8')
  const words = list.split('\n')
  const entries = await Promise.all(
    words.map((word, idx) => getEntry(word, idx + 1))
  )
  const { verb, adjective } = groupBy(entries, 'type')
  const verbContent = verb.map((e, idx) => `${idx + 1}. ${e.text}`).join('\n')
  const adjContent = adjective
    .map((e, idx) => `${idx + 1}. ${e.text}`)
    .join('\n')
  const content = `# 动词\n${verbContent}\n# 形容词\n${adjContent}`
  fs.writeFileSync('output.txt', content)
}

main()
