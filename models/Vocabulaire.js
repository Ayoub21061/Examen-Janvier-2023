import Model from './Model.js';

export default class Vocabulaire extends Model {

  static table = "Vocabulaire.mots";
  static primary = ["idmots"];
}
