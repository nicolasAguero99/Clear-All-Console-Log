const LANG = {
  javascript: {
    regex: {
      allOutputs: /\s*console\.\w+\((?:[^()]*|\([^()]*\))*\);?/,
      exceotError: /\s*console\.(?!error)\w+\((?:[^()]*|\([^()]*\))*\);?/
    },
    extensions: ['js', 'ts', 'jsx', 'tsx'],
    label: 'Javascript/Typescript',
    subfix_command: 'javascript'
  },
  python: {
    regex: {
      allOutputs: /\s*print\((?:[^()]*|\([^()]*\))*\)/,
    },
    extensions: ['py'],
    label: 'Python',
    subfix_command: 'python'
  },
  java: {
    regex: {
      allOutputs: /\s*System\.out\.println\((?:[^()]*|\([^()]*\))*\);?/,
    },
    extensions: ['java'],
    label: 'Java',
    subfix_command: 'java'
  },
  c: {
    regex: {
      allOutputs: /\s*printf\((?:[^()]*|\([^()]*\))*\);?/,
    },
    extensions: ['c', 'h'],
    label: 'C',
    subfix_command: 'c'
  },
  c_plus_plus: {
    regex: {
      allOutputs: /\s*(?:std::)?cout\s*<<\s*(?:[^;]*|\([^()]*\))*;?/,
    },
    extensions: ['cpp', 'hpp'],
    label: 'C++',
    subfix_command: 'c_plus_plus'
  },
  c_sharp: {
    regex: {
      allOutputs: /\s*Console\.WriteLine\((?:[^()]*|\([^()]*\))*\);?/,
    },
    extensions: ['cs'],
    label: 'C#',
    subfix_command: 'c_sharp'
  },
}

module.exports = {
  LANG
}