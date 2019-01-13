import { Injectable } from '@angular/core';


export class TranslationSet {
   public languange: string;
   public values: {[key: string]: string} = {};
}

@Injectable()
export class TranslationService {

    public languages = ['fr','ar'];

    public language = 'fr';

    private dictionary: {[key: string]: TranslationSet} = {
        'ar' : {
            languange: 'ar',
            values: {
                'Email' : 'البريد الإلكتروني',
                'mot de passe' :'كلمة السر',
                'se souvenir de moi' : 'يتذكرني',
                'se connecter' : 'دخول',
                'je n ai pas de compte' : 'ليس لدي حساب ',
                's inscrir' : 'تسجيل',
                'Nom complet': 'الاسم الكامل'
           }
        },
        'fr' : {
            languange: 'fr',
            values: {
                'Email' : 'Email ',
                'mot de passe' :'Mot de pase',
                'se souvenir de moi' : 'Se souvenir de moi',
                'se connecter' : 'Se connecter ',
                'je n ai pas de compte' : ' Je nai pas de compte ',
                's inscrire' : "S'inscrire",
                'Nom complet': 'Nom complet'
            }
        }
    };

    constructor() { }

    translate(value: string): string {
        console.log('translate called with value ' + value + ' and language ' + this.language);
        if ( this.dictionary[this.language] != null) {
            return this.dictionary[this.language].values[value];
        }
    }
}