import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';


export class TranslationSet {
   public languange: string;
   public values: {[key: string]: string} = {};
}

@Injectable()
export class TranslationService {

    private dictionary: {[key: string]: TranslationSet} = {
        'ar' : {
            languange: 'ar',
            values: {
                'Email' : 'البريد الإلكتروني',
                'Mot de passe' : 'كلمة السر',
                'Se souvenir de moi' : 'يتذكرني',
                'Se connecter' : 'دخول',
                'Je n\'ai pas encore de compte,' : 'ليس لدي حساب ',
                'S\'inscrire'  : 'تسجيل',
                'Nom complet': 'الاسم الكامل',
                'Ce champ est': 'هدا الحقل اجباري',
                'Obligatoire': 'اجباري',
                 'Veuillez entrer un email valide': 'يرجى إدخال بريد إلكتروني صالح',
                 'Numero de Telephone' : 'رقم الهاتف',
                 'J\'ai déja un compte,': 'لدي بالفعل حساب ،',
                 'Echec de connection': 'خطأ اتصال' ,
                 'Vos identifiants sont incorrectes. Veuillez ressayer.': 'بيانات الاعتماد الخاصة بك غير صحيحة. المرجو اعادة المحاولة.',
                 'Fermer': 'fermer',
                 'Echec d\'inscription': 'فشل في التسجيل',
                 'Veuillez ressayer.': 'المرجو اعادة المحاولة.',
                 'Votre email ou numéro de Téléphone sont déja existants.': 'بريدك الإلكتروني أو رقم هاتفك موجود بالفعل.',
                 'Enregistrement Vocal': 'تسجيل صوتي',
                 'Vous êtes Inscrit': 'أنت مسجل',
                 'Vous pouvez désormais vous connecter.': 'يمكنك الآن الاتصال.'


           }
        },
        'fr' : {
            languange: 'fr',
            values: {
                'Email' : 'Email',
                'Mot de passe' : 'Mot de passe',
                'Se souvenir de moi' : 'Se souvenir de moi',
                'Se connecter' : 'Se connecter ',
                'Je n\'ai pas encore de compte,' : ' Je n\'ai pas encore de compte',
                'S\'inscrire' : 'S\'inscrire',
                'Nom complet': 'Nom complet',
                'Ce champ est': 'Ce champ est',
                'Obligatoire': 'Obligatoire',
                'Veuillez entrer un email valide': 'Veuillez entrer un email valide',
                'Numero de Telephone' : 'Numero de Téléphone',
                'J\'ai déja un compte,': ' J\'ai déja un compte,',
                'Echec de connection': 'Echec de connection' ,
                'Vos identifiants sont incorrectes. Veuillez ressayer.': 'Vos identifiants sont incorrectes. Veuillez ressayer.',
                'Fermer': 'Fermer',
                'Echec d\'inscription': 'Echec d\'inscription',
                'Veuillez ressayer.': 'Veuillez ressayer.',
                'Votre email ou numéro de Téléphone sont déja existants.': 'Votre email ou numéro de Téléphone sont déja existants.',
                'Enregistrement Vocal': 'Enregistrement Vocal',
                'Vous êtes Inscrit': 'Vous êtes Inscrit',
                'Vous pouvez désormais vous connecter.': 'Vous pouvez désormais vous connecter.'
            }
        }
        ,
        'en' : {
            languange: 'en',
            values: {
                'Email' : 'Email',
                'Mot de passe' : 'Password',
                'Se souvenir de moi' : 'Remember me',
                'Se connecter' : 'Login ',
                'Je n\'ai pas encore de compte,' : 'I don\'t have an account ',
                'S\'inscrire'  : 'Register',
                'Nom complet': 'Full name',
                'Ce champ est': 'This field is',
                'Obligatoire': 'Required',
                'Veuillez entrer un email valide': 'Please enter a valid email',
                'Numero de Telephone' : 'Phone number',
                'J\'ai déja un compte,': 'I already have an account ،',
                'Echec de connection': 'Connection failure' ,
                'Vos identifiants sont incorrectes. Veuillez ressayer.': 'Your informations are incorrect. Try Again.',
                'Fermer': 'Close',
                'Echec d\'inscription': 'Failure to register',
                'Veuillez ressayer.': 'Try again',
                'Votre email ou numéro de Téléphone sont déja existants.': 'Your email or phone number are already existing.',
                'Enregistrement Vocal': 'Voice Recording',
                'Vous êtes Inscrit': 'You are registered',
                'Vous pouvez désormais vous connecter.': 'You can now connect.'

            }
        }
    };

    constructor() { }

    translate(value: string): string {
        return this.dictionary[LanguageService.getLang()].values[value];
    }
}
