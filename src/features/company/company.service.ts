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
            uuid: 'bad92e9b-ef1b-4209-ae66-b3d97b78b90e',
            name: 'ДНС на Солотчинском шоссе',
            address: 'г. Рязань, Солотчинское шоссе, д. 76'
          },
        ]
      },
      {
        uuid: 'd40ba25f-70d3-4856-9ebe-af1ee01294b7',
        name: 'Элекс',
        branches: []
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
        branch.subscribe = branch.uuid in user.subscribe
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
    if (companyUUID in this.user[userId].subscribe) {
      new HttpException('Already subscribe', HttpStatus.BAD_REQUEST)
    }
    this.user[userId].subscribe.push(companyUUID)
    return true
  }

  async unsubscribe(companyUUID: string, userId: number): Promise<boolean | never> {
    if (!(userId in this.user)) {
      new HttpException('User undefined', HttpStatus.BAD_REQUEST)
    }
    if (!(userId in this.user[userId].subscribe)) {
      new HttpException('Already unsubscribe', HttpStatus.BAD_REQUEST)
    }
    const index = this.user[userId].subscribe.indexOf(companyUUID)
    this.user[userId].subscribe.splice(index, 1);
    return true
  }
}
