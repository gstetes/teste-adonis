import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Client from 'App/Models/Client';

export default class ClientsController {
  public async index(ctx: HttpContextContract) {
    try {
      const clients = await Client.all();

      if (!clients.length) {
        return ctx.response.badRequest({ message: 'Não há conteudo para ser mostrado.'}); 
      };

      return ctx.response.ok(clients);
    } catch (error) {
      return ctx.response.internalServerError({
        message: `Erro interno, detalhes: ${error.message}`,
      })
    }
  };

  public async create(ctx: HttpContextContract) {
    const { nome, email, cidade } = ctx.request.body();

    if(!nome) {
      return ctx.response.badRequest({
        message: 'Nome não pode ser vazio.',
      });
    };

    if(!email) {
      return ctx.response.badRequest({
        message: 'Email não pode ser vazio.',
      });
    };

    if(!cidade) {
      return ctx.response.badRequest({
        message: 'Cidade não pode ser vazia.',
      });
    };

    try {
      const client = await Client.create({
        nome,
        email,
        cidade
      });

      if(client.$isPersisted) {
        return ctx.response.ok(client);
      } else {
        return ctx.response.badRequest({
          message: 'Erro ao cadastrar cliente.'
        });
      };
    } catch (error) {
      return ctx.response.internalServerError({
        message: `Erro interno, detalhes: ${error.message}`,
      });
    };
  };

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.request.body();

    if (!id) {
      return ctx.response.badRequest({
        message: 'Informe o ID de um cliente.',
      });
    };

    try {
      const client = await Client.find(id);

      if (!client) {
        return ctx.response.badRequest({
          message: 'Cliente não encontrado.',
        });
      };

      await client.merge(ctx.request.body());
      await client.save();

      if(client.$isPersisted) {
        return ctx.response.ok(client);
      } else {
        return ctx.response.badRequest({
          message: 'Erro ao atualizar cliente',
        });
      };
    } catch (error) {
      return ctx.response.internalServerError({
        message: `Erro interno, detalhes: ${error.message}`,
      });
    };
  };

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.request.params();

    if (!id) {
      return ctx.response.badRequest({
        message: 'Informe o ID de um cliente.',
      });
    };

    try {
      const client = await Client.find(id);

      if(!client) {
        return ctx.response.badRequest({
          message: 'Cliente não encontrada.',
        });
      };

      await client.delete();
      
      if(client.$isDeleted) {
        return ctx.response.noContent();
      } else {
        return ctx.response.badRequest({
          message: 'Erro ao deletar cliente.',
        });
      };
    } catch (error) {
      return ctx.response.internalServerError({
        message: `Erro interno, detalhes: ${error.message}`,
      });
    };
  };
};