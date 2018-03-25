App.conversation = App.cable.subscriptions.create("ConversationChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    console.log(data['message']);
  },

  speak: function(message) {
    return this.perform('speak',{
      message: message
    });
  }
});

$(document).on('submit', '.new_messages', function(e){
  e.preventDefault();
  var values = $(this).serializeArray();
  App.conversation.speak(values);
  $(this).trigger('reset');
});
