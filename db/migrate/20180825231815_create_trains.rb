class CreateTrains < ActiveRecord::Migration[5.1]
  def change
    create_table :trains do |t|
      t.string :train_line
      t.string :route
      t.string :run_number
      t.string :operator_id

      t.timestamps
    end
  end
end
