Rails.application.routes.draw do
  root 'trains#index'
  resources :trains
end
