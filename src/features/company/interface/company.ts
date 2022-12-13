import { IBranch } from "./branch"

export interface ICompany {
    uuid:  string
    name: string
    branches: IBranch[]
}