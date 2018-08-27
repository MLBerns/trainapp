class TrainsController < ApplicationController
  def index
    @trains = Train.order('run_number ASC')
    @train = Train.new
  end

  def create
    @train = Train.create(train_params)
    if @train.save
      render json: @train
    else
      render json: @train.errors, status: :unprocessable_entity
    end
  end

  def update
    @train = Train.find(params[:id])
    if @train.update(train_params)
      render json: @train
    else
      render json: @train.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @train = Train.find(params[:id])
    @train.destroy
    render json: @train
  end

  private

  def train_params
    params.require(:train).permit(:train_line, :route, :run_number, :operator_id)
  end

  def page
    params[:page] || 1
  end
end