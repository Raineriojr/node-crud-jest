import { Request } from "express";
import { makeMockResponse } from "../mocks/mockResponse";
import { UserController } from "./userController"

describe('user controller', () => {
  const userController = new UserController();

  const mockRequest = {} as Request;
  const mockResponse = makeMockResponse();

  it('must to list user', () => {
    userController.index(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toHaveLength(2);
  })

  describe('when creating user', () => {
    it('must add new user', () => {
      mockRequest.body = {
        name: 'novo usuário'
      }
      userController.create(mockRequest, mockResponse);

      expect(mockResponse.state.status).toBe(200);
      expect(mockResponse.state.json).toMatchObject({ message: `Usuário novo usuário cadastrado com sucesso` });
    })

    it('must not create new user if name is empty', () => {
      mockRequest.body = {
        name: ''
      }
      userController.create(mockRequest, mockResponse);

      expect(mockResponse.state.status).toBe(403);
      expect(mockResponse.state.json).toMatchObject({ message: 'Não é possível cadastrar usuário sem nome' });
    })
  })

  describe('when updating user', () => {
    it('must update username', () => {
      mockRequest.body = {
        name: 'novo nome'
      }
      mockRequest.params = {
        id: '1'
      }
  
      userController.update(mockRequest, mockResponse);
  
      expect(mockResponse.state.status).toBe(200);
      expect(mockResponse.state.json).toMatchObject({ message: `Nome de usuário atualizado com sucesso!` })
    })
  
    it('must not update username if user id not exists', () => {
      mockRequest.body = {
        name: 'novo nome'
      }
      mockRequest.params = {
        id: '3'
      }
  
      userController.update(mockRequest, mockResponse);
  
      expect(mockResponse.state.status).toBe(400);
      expect(mockResponse.state.json).toMatchObject({ message: 'Falha ao atualizar dados de usuário' })
    })
  })

  describe('when deleting user', () => {
    it('must delete user', () => {
      mockRequest.params = {
        id: '1'
      }
      userController.delete(mockRequest, mockResponse);
      
      expect(mockResponse.state.status).toBe(200);
      expect(mockResponse.state.json).toMatchObject({ message: `Usuário deletado com sucesso!` });
    })

    it('must not delete user if user id not exists', () => {
      mockRequest.params = {
        id: '3'
      }
  
      userController.delete(mockRequest, mockResponse);
  
      expect(mockResponse.state.status).toBe(400);
      expect(mockResponse.state.json).toMatchObject({ message: 'Falha ao deletar usuário' })
    })
  })
})