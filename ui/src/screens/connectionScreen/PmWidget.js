/*global WyrePmWidget*/

export const openPmWidget = onSuccess => {
  const wyrePmWidget = new WyrePmWidget({
    env: 'test',
    onLoad: function() {
      // In this example we open the modal immediately on load. More typically you might have the handler.open() invocation attached to a button.
      wyrePmWidget.open();
    },
    onSuccess: function(result) {
      // Here you would forward the publicToken back to your server in order to  be shipped to the Wyre API
      console.log(result.publicToken);
      onSuccess(result.publicToken)
    },
    onExit: function(err) {
      if (err != null) {
        // The user encountered an error prior to exiting the module
      }
      console.log('Thingo exited:', err);
    },
  });
}