class Train < ApplicationRecord
  validates :train_line, :route, :run_number, :operator_id, presence: true
end
