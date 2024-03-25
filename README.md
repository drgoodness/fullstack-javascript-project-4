# gendiff.js
[![Hexlet | Actions Status](https://github.com/drgoodness/fullstack-javascript-project-4/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/drgoodness/fullstack-javascript-project-4/actions)
[![Node CI | Actions Status](https://github.com/drgoodness/fullstack-javascript-project-4/actions/workflows/node-ci.yml/badge.svg)](https://github.com/drgoodness/fullstack-javascript-project-4/actions)
[![Codeclimate | Maintainability](https://api.codeclimate.com/v1/badges/5a74e5324a0be596ee93/maintainability)](https://codeclimate.com/github/drgoodness/fullstack-javascript-project-4/maintainability)
[![Codeclimate | Test Coverage](https://api.codeclimate.com/v1/badges/5a74e5324a0be596ee93/test_coverage)](https://codeclimate.com/github/drgoodness/fullstack-javascript-project-4/test_coverage)

## Description
Here is introduced a cli-app which loads a page with all its content to a dedicated folder and replaces corresponded links on local ones.

## Usage
### Prerequisites
- Node 21 is installed.
### Install
```bash
git clone https://github.com/drgoodness/fullstack-javascript-project-4.git

npm ci

npm link
```
### Run
Start an app. For example:
```bash
$ page-loader -h
Usage: page-loader [options] <url>

Page loader utility

Options:
  -V, --version       output the version number
  -o, --output [dir]  output dir (default: "/home/user/current-dir")
  -h, --help          display help for command
```

## Demo
[![asciicast](https://asciinema.org/a/w2Rrm75EZouzuc0TP1dRnG6Z8.svg)](https://asciinema.org/a/w2Rrm75EZouzuc0TP1dRnG6Z8)