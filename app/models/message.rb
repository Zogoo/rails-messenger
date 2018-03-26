class Message < ApplicationRecord
  belongs_to :user
  belongs_to :conversation

  # Callback after successfully commit into database
  after_create_commit { MessageBroadcastJob.perform_later(self) }
end
