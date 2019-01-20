import { Injectable } from '@angular/core';


export class TranslationSet {
   public languange: string;
   public values: {[key: string]: string} = {};
}

@Injectable()
export class TranslationService {

    public languages = ['Français','Arabe','English'];

    public language = 'français';

    private dictionary: {[key: string]: TranslationSet} = {
        'Arabe' : {
            languange: 'Arabe',
            values: {
                'Email' : 'البريد الإلكتروني',
                'Mot de passe' :'كلمة السر',
                'se souvenir de moi' : 'يتذكرني',
                'Se connecter' : 'دخول',
                "Je n'ai pas encore de compte," : 'ليس لدي حساب ',
                "S'inscrire"  : 'تسجيل',
                'Nom complet': 'الاسم الكامل',
                'Ce champ est ':'هدا الحقل اجباري',
                'obligatoire':' اجباري', 
                 'Veuillez entrer un email valide ':'يرجى إدخال بريد إلكتروني صالح',
                 "Numero de Telephone" : 'رقم الهاتف',
                 "J'ai déja un compte,":'لدي بالفعل حساب ،',
                 "Echec de connection":'خطأ اتصال' ,
                 "Vos identifiants sont incorrectes. Veuillez ressayer.": 'بيانات الاعتماد الخاصة بك غير صحيحة. المرجو اعادة المحاولة.',
                 "Fermer":'fermer',
                 "Echec d'inscription":'فشل في التسجيل',
                 "Veuillez ressayer.":'المرجو اعادة المحاولة.',
                 "Votre email ou numéro de Téléphone sont déja existants.":'بريدك الإلكتروني أو رقم هاتفك موجود بالفعل.',
                 "Enregistrement Vocal":'تسجيل صوتي',
                 "Vous êtes Inscrit":'أنت مسجل',
                 "Vous pouvez désormais vous connecter.":'يمكنك الآن الاتصال.'
            

           }
        },
        'Français' : {
            languange: 'Français',
            values: {
                'Email' : 'Email ',
                'Mot de passe' :'Mot de pase',
                'se souvenir de moi' : 'Se souvenir de moi',
                'Se connecter' : 'Se connecter ',
                "Je n'ai pas encore de compte," : ' Je nai pas de compte ',
                "S'inscrire" : "S'inscrire",
                'Nom complet': 'Nom complet',
                'Ce champ est ':'Ce champ est ',
                'obligatoire': 'obligatoire',
                'Veuillez entrer un email valide ':'Veuillez entrer un email valide',
                "Numero de Telephone" : 'Numero de Téléphone',
                "J'ai déja un compte,":" J'ai déja un compte,",
                "Echec de connection":'Echec de connection' ,
                 "Vos identifiants sont incorrectes. Veuillez ressayer.": 'Vos identifiants sont incorrectes. Veuillez ressayer.',
                 "Fermer":'Fermer',
                 "Echec d'inscription":"Echec d'inscription",
                 "Veuillez ressayer.":'Veuillez ressayer.',
                 "Votre email ou numéro de Téléphone sont déja existants.":'Votre email ou numéro de Téléphone sont déja existants.',
                 "Enregistrement Vocal":'Enregistrement Vocal',
                 "Vous êtes Inscrit":'Vous êtes Inscrit',
                 "Vous pouvez désormais vous connecter.":'Vous pouvez désormais vous connecter.'

            }
        }
        ,
        'English' : {
            languange: 'English',
            values: {
                'Email' : 'Email ',
                'Mot de passe' :'Password',
                'se souvenir de moi' : 'Remember me',
                'Se connecter' : 'Login ',
                "Je n'ai pas encore de compte," : "I don't have an account ",
                "S'inscrire"  : "Register",
                'Nom complet': 'Full name',
                'Ce champ est ':'This field is ',
                'obigatoire': 'required',
                'Veuillez entrer un email valide ':'Please enter a valid email',
                'Numero de Telephone' : 'Phone number',
                "J'ai déja un compte,":'I already have an account ،',
                "Echec de connection":'Connection failure' ,
                "Vos identifiants sont incorrectes. Veuillez ressayer.": 'Your informations are incorrect. Try Again.',
                "Fermer":'Close',
                "Echec d'inscription":"Failure to register",
                "Veuillez ressayer.":'Try again',
                "Votre email ou numéro de Téléphone sont déja existants.":'Your email or phone number are already existing.',
                "Enregistrement Vocal":'Voice Recording',
                "Vous êtes Inscrit":'You are registered',
                "Vous pouvez désormais vous connecter.":'You can now connect.'
                
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