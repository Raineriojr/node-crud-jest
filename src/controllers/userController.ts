import { Request, Response } from "express";
import { database } from "../database/database.js";

export class UserController {
  index(req: Request, res: Response): Response {
    return res.status(200).json(database)
  }

  create(req: Request, res: Response): Response {
    const { name } = req.body;

    const id = database.length

    if (name < 1) {
      return res.status(403).json({ message: 'Não é possível cadastrar usuário sem nome' })
    }

    database.push({
      id: id,
      name: name
    });
    return res.status(200).json({ message: `Usuário ${name} cadastrado com sucesso` });
  }

  update(req: Request, res: Response): Response {
    const { id } = req.params;
    const { name } = req.body;

    const existsID: any = database.some((user) => user.id === Number(id));

    if (!existsID) {
      return res.status(400).json({ message: 'Falha ao atualizar dados de usuário' })
    }

    if (name < 1) {
      return res.status(400).json({ message: 'Não é possível cadastrar usuário sem nome' })
    }
    
    for (const user of database) {      
      if (user.id === Number(id)) {
        user.name = name

        break;
      }
    }

    return res.status(200).json({ message: `Nome de usuário atualizado com sucesso!` })
  }

  delete (req: Request, res: Response): Response{
    const { id } = req.params;

    const existsID: any = database.some((user) => user.id === Number(id));

    if (!existsID) {
      return res.status(400).json({ message: 'Falha ao deletar usuário' })
    }

    database.splice(Number(id), 1)

    return res.status(200).json({ message: `Usuário deletado com sucesso!` })
  }
}