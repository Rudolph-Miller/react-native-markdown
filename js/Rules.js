'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rules;

var _reactNative = require('react-native');

var _reactNative2 = _interopRequireDefault(_reactNative);

var _simpleMarkdown = require('simple-markdown');

var _simpleMarkdown2 = _interopRequireDefault(_simpleMarkdown);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rules(styles) {
  return {
    autolink: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.autolink,
          onPress: _lodash2.default.noop
        }, output(node.content, state));
      }
    },
    blockQuote: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.blockQuote
        }, output(node.content, state));
      }
    },
    br: {
      react: function react(node, output, state) {
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.br
        }, '\n\n');
      }
    },
    codeBlock: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.codeBlock
        }, null);
      }
    },
    del: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.del
        }, output(node.content, state));
      }
    },
    em: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.em
        }, output(node.content, state));
      }
    },
    heading: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: [styles.heading, styles['heading' + node.level]]
        }, output(node.content, state));
      }
    },
    hr: {
      react: function react(node, output, state) {
        return _reactNative2.default.createElement(_reactNative.View, { key: state.key, style: styles.hr });
      }
    },
    image: {
      react: function react(node, output, state) {
        return _reactNative2.default.createElement(_reactNative.Image, {
          key: state.key,
          source: { uri: node.target },
          style: styles.image
        });
      }
    },
    inlineCode: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.inlineCode
        }, output(node.content, state));
      }
    },
    link: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.autolink
        }, output(node.content, state));
      }
    },
    list: {
      react: function react(node, output, state) {

        var items = _lodash2.default.map(node.items, function (item, i) {
          var bullet;
          if (node.ordered) {
            bullet = _reactNative2.default.createElement(_reactNative.Text, { style: styles.listItemNumber }, i + 1 + '. ');
          } else {
            bullet = _reactNative2.default.createElement(_reactNative.Text, { style: styles.listItemBullet, key: i }, '• ');
          }
          return _reactNative2.default.createElement(_reactNative.View, {
            key: i,
            style: styles.listItem
          }, [bullet, output(item, state)]);
        });

        return _reactNative2.default.createElement(_reactNative.View, { key: state.key, style: styles.list }, items);
      }
    },
    mailto: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.mailto,
          onPress: _lodash2.default.noop
        }, output(node.content, state));
      }
    },
    newline: {
      react: function react(node, output, state) {
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.newline
        }, '\n');
      }
    },
    paragraph: {
      react: function react(node, output, state) {
        return _reactNative2.default.createElement(_reactNative.View, {
          key: state.key,
          style: styles.paragraph
        }, output(node.content, state));
      }
    },
    strong: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.strong
        }, output(node.content, state));
      }
    },
    table: {
      react: function react(node, output, state) {
        var headers = _lodash2.default.map(node.header, function (content, i) {
          return _reactNative2.default.createElement(_reactNative.Text, {
            style: styles.tableHeaderCell
          }, output(content, state));
        });

        var header = _reactNative2.default.createElement(_reactNative.View, { style: styles.tableHeader }, headers);

        var rows = _lodash2.default.map(node.cells, function (row, r) {
          var cells = _lodash2.default.map(row, function (content, c) {
            return _reactNative2.default.createElement(_reactNative.View, {
              key: c,
              style: styles.tableRowCell
            }, output(content, state));
          });
          var rowStyles = [styles.tableRow];
          if (node.cells.length - 1 == r) {
            rowStyles.push(styles.tableRowLast);
          }
          return _reactNative2.default.createElement(_reactNative.View, { key: r, style: rowStyles }, cells);
        });

        return _reactNative2.default.createElement(_reactNative.View, { key: state.key, style: styles.table }, [header, rows]);
      }
    },
    text: {
      react: function react(node, output, state) {
        // Breaking words up in order to allow for text reflowing in flexbox
        var words = node.content.split(' ');
        words = _lodash2.default.map(words, function (word, i) {
          var elements = [];
          if (i != words.length - 1) {
            word = word + ' ';
          }
          var textStyles = [styles.text];
          if (!state.withinText) {
            textStyles.push(styles.plainText);
          }
          return _reactNative2.default.createElement(_reactNative.Text, {
            style: textStyles
          }, word);
        });
        return words;
      }
    },
    u: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.View, {
          key: state.key,
          style: styles.u
        }, output(node.content, state));
      }
    },
    url: {
      react: function react(node, output, state) {
        state.withinText = true;
        return _reactNative2.default.createElement(_reactNative.Text, {
          key: state.key,
          style: styles.url,
          onPress: _lodash2.default.noop
        }, output(node.content, state));
      }
    }
  };
};