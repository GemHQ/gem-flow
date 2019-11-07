/*global WyrePmWidget*/

const wyrePmWidget = window.wyreWidget = new WyrePmWidget({
  env: 'test',
  onExit: function(err) {
    if (err != null) {
      // The user encountered an error prior to exiting the module
    }
    console.log('Wyre PM widget exited:', err);
  },
});

export const openPmWidget = onSuccess => {
  wyrePmWidget.params.onSuccess = result => onSuccess(result.publicToken);
  wyrePmWidget.open();
}