# Wordsheet

> **Designed for personal usage**

A simple generator that generates a sheet of words alongside with common usages and its simple meta info, from a given word list.

For my very own purpose, this would only output _adjectives_ and _verbs_. Adjust to suit you need. PR encouraged to make it a item for config.

All API responses for the first query result are saved in `words` and used as a cache to save API quota.

## Usage

1. Get an API key for Learner's from [dictionaryapi.com](dictionaryapi.com).
2. Put it in `config.example.js` and rename it `config.js`.
3. Put your list of words in `word.txt`. You need to create it.
4. `node index` and output will be in `output.txt`.
5. If step 4 threw errors, fix it and please file a PR.

## Contributing

File a PR for any bug or feat. Just don't break my own need. Provide an option in config if behavior changing.

## License

MIT. See `LICENSE`.
