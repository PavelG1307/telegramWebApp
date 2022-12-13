import { Injectable } from "@nestjs/common"
import { ICompany } from './interface'
@Injectable()
export class CompanyService {
  company: ICompany[]

  constructor() {
    this.company = [
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

  async get() {
    return []
  }

}
