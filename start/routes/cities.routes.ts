import Route from '@ioc:Adonis/Core/Route';

Route.get('/cities', 'CitiesController.index');
Route.post('/cities', 'CitiesController.create');
Route.put('/cities/:id', 'CitiesController.update');
Route.delete('/cities/:id', 'CitiesController.destroy');

export default Route;