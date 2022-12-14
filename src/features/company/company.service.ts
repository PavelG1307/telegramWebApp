import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { IUser } from "../user/interface"
import { ICompany } from './interface'
@Injectable()
export class CompanyService {
  companies: ICompany[] = []
  user: { [id: number]: IUser} = {}

  constructor() {
    this.companies = [
      {
        uuid: 'c01d2129-31ea-41a3-9938-55f4da8d3687',
        name: 'ДНС',
        branches: [
          {
            uuid: 'ccaca8ba-a3c6-41b7-b3c2-f5f02eec0cae',
            name: 'ДНС на ул. Советской армии',
            address: 'г. Рязань, ул. Советская армия, д. 1А'
          },
          {
            uuid: 'bad92e9b-ef1b-4209-ae66-b3d97b78b90e',
            name: 'ДНС на ул. Есенина',
            address: 'г. Рязань, ул. Есенина, д. 56'
          },
          {
            uuid: '66b91e42-02f5-4357-a36b-582c743a549f',
            name: 'ДНС на Солотчинском шоссе',
            address: 'г. Рязань, Солотчинское шоссе, д. 76'
          },
        ]
      },
      {
        uuid: 'd40ba25f-70d3-4856-9ebe-af1ee01294b7',
        name: 'Элекс',
        branches: [
          {
            uuid: '026cb80f-23ff-44b7-b364-ee1373171f8a',
            name: 'Элекс на ул. Гоголя',
            address: 'г. Рязань, ул. Гоголя, д. 15А'
          },
          {
            uuid: '6bd22542-0506-4756-8e4f-b2803669d737',
            name: 'Элекс на ул. Полетаева',
            address: 'г. Рязань, ул. Полетаева, д. 23'
          }
        ]
      },
      {
        uuid: '86ae3df2-ed6d-46ba-ac53-1200d136b9e2',
        name: 'Додо',
        branches: [
          {
            uuid: '516dd674-3c00-475d-887d-a4b347feadc5',
            name: 'Додо на ул. Карла Маркса',
            address: 'г. Рязань, ул. Карла Маркса, д. 10'
          },
          {
            uuid: '1282d27b-c089-4037-8ca2-8260ae7259ee',
            name: 'Додо на ул. Полетаева',
            address: 'г. Рязань, ул. Полетаева, д. 29'
          },
          {
            uuid: '421cfc58-d720-498b-8b80-bbf9545ab663',
            name: 'Додо на ул. Новоселов',
            address: 'г. Рязань, ул. Новоселов, д. 10'
          },
        ]
      },
      {
        uuid: '7ecba4e7-b608-471e-9e4e-980f4c8565fb',
        name: 'Томато',
        branches: [
          {
            uuid: '2efcc3f3-2c83-4311-8efe-c1c09aaa8837',
            name: 'Томато на ул. Соборной',
            address: 'г. Рязань, ул. Соборная, д. 105'
          },
          {
            uuid: 'aad43e27-5854-4eac-878d-741619bf3f2a',
            name: 'Томато на ул. Зубковой',
            address: 'г. Рязань, ул. Зубковой, д. 29'
          },
          {
            uuid: '8f7b1337-2b91-4b7d-9372-f99836628f8f',
            name: 'Томато на ул. Урицкого',
            address: 'г. Рязань, ул. Урицкого, д. 13'
          },
        ]
      }
    ]
  }

  async get(userId: number): Promise<ICompany[]> {
    if (!(userId in this.user)) {
      this.user[userId] = {
        id: userId,
        subscribe: []
      }
    }
    const user = this.user[userId]
    const companyDTO = this.companies.map(company => {
      company.branches = company.branches.map(branch => {
        branch.subscribe = user.subscribe.includes(branch.uuid)
        return branch
      })
      return company
    })
    return companyDTO
  }

  async subscribe(companyUUID: string, userId: number): Promise<boolean | never> {
    if (!(userId in this.user)) {
      this.user[userId] = {
        id: userId,
        subscribe: []
      }
    }
    if (this.user[userId].subscribe.includes(companyUUID)) {
      new HttpException('Already subscribe', HttpStatus.BAD_REQUEST)
    }
    this.user[userId].subscribe.push(companyUUID)    
    return true
  }

  async unsubscribe(companyUUID: string, userId: number): Promise<boolean | never> {
    if (!(userId in this.user)) {
      new HttpException('User undefined', HttpStatus.BAD_REQUEST)
    }
    if (!(this.user[userId].subscribe.includes(companyUUID))) {
      new HttpException('Already unsubscribe', HttpStatus.BAD_REQUEST)
    }
    const index = this.user[userId].subscribe.indexOf(companyUUID)
    this.user[userId].subscribe.splice(index, 1);
    return true
  }
}
