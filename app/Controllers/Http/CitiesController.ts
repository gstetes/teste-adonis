import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Citie from 'App/Models/Citie';

export default class CitiesController {
  public async index (ctx: HttpContextContract) {
    try {
      const cities = await Citie.all();

      if (!cities.length) {
        return ctx.response.badRequest({ message: 'Sem conteudo para mostrar.' });
      };
      
      return ctx.response.json(cities);  
    } catch (error) {
      return ctx.response.internalServerError({ message: `Erro interno, detalhes ${error.message}` });
    };
  };

  public async create (ctx: HttpContextContract) {
    const { descricao, uf } = ctx.request.body();

    if (!descricao) {
      return ctx.response.badRequest({ message: 'Descrição não pode ser vázia' });
    };

    if (!uf) {
      return ctx.response.badRequest({ message: 'UF não pode ser vázia' });
    };

    try {
      const citie = await Citie.create({
        descricao,
        uf
      });

      if (citie.$isPersisted) {
        return ctx.response.ok(citie);
      } else {
        return ctx.response.badRequest({
          message: 'Erro ao cadastrar cidade.'
        });
      };
    } catch (error) {
      return ctx.response.internalServerError({
        message: `Erro interno, detalhes: ${error.message}`,
      });
    };
  };

  public async update (ctx: HttpContextContract) {
    const { id } = ctx.request.params();

    if (!id) {
      return ctx.response.badRequest({
        message: 'Informe o ID de uma cidade.',
      });
    };

    try {
      const citie = await Citie.find(id);

      if (!citie) {
        return ctx.response.badRequest({
          message: 'Cidade não encontrada.',
        });
      };

      await citie.merge(ctx.request.body());
      await citie.save();

      if (citie.$isPersisted) {
        return ctx.response.ok(citie);
      } else {
        return ctx.response.badRequest({
          message: 'Erro ao atualizar cidade.',
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
        message: 'Informe o ID de uma cidade.',
      });
    };

    try {
      const citie = await Citie.find(id);

      if (!citie) {
        return ctx.response.badRequest({
          message: 'Cidade não encontrada',
        });
      };

      await citie.delete();

      if(citie.$isDeleted) {
        return ctx.response.noContent();
      } else {
        return ctx.response.badRequest({
          message: 'Erro ao deletar cidade.',
        });
      };
    } catch (error) {
      return ctx.response.internalServerError({
        message: `Erro interno, detalhes: ${error.message}`,
      });
    };
  };
};