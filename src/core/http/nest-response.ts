/* eslint-disable prettier/prettier *//* eslint-disable @typescript-eslint/ban-types */

export class NestResponse {
    status: number;
    headers: Object;
    body: Object;

    constructor(resposta: NestResponse) {
        Object.assign(this, resposta); //com o assign não preciso declarar cada propriedade, o this já acionará todas
    }
}