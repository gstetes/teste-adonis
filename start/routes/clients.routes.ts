import Route from '@ioc:Adonis/Core/Route';

Route.get('/clients', 'Clients.index');
Route.post('/clients', 'Clients.create');
Route.put('/clients/:id', 'Clients.update');
Route.delete('/clients/:id', 'Clients.destroy');

export default Route;