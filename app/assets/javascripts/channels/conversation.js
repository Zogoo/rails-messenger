App.conversation = App.cable.subscriptions.create("ConversationChannel", {
  connected: function() {
    // Called when the subscription is ready for use on the server
  },

  disconnected: function() {
    // Called when the subscription has been terminated by the server
  },

  received: function(data) {
    var conversation = $('#conversations-list').find("[data-conversation-id='"+ data['conversation_id'] + "']");

    if(data['window'] !== undefined){
      var conversation_visible = conversation.is(':visible');

      if(conversation_visible){
        var messages_visible = (conversation).find('.panel-body').is(':visible');

        if (!messages_visible){
          conversation.removeClass('panel-default').addClass('panel-success');
        }
        conversation.find('.messages-list').find('ul').append(data['message']);
      }
    }
    else {
      conversation.find('.messages-list').find('ul').append(data['message']);
    }

    var messages_list = conversation.find('.messages-list');
    var height = messages_list[0].scrollHeight;
    messages_list.scrollTop(height);

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
