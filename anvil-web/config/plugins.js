exports.FilterCssConflictingWarning = class FilterCssConflictingWarning {
  apply(complier) {
    complier.hooks.afterEmit.tap('FilterWarning', (compilation) => {
      compilation.warnings = (compilation.warnings || []).filter((warning) => {
        return warning.message.indexOf('Conflicting order between:') === -1;
      });
    });
  }
};
