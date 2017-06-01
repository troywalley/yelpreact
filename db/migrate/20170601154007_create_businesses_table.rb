class CreateBusinessesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :businesses do |t|
      t.string :name
      t.string :image
      t.string :category
    end
  end
end
