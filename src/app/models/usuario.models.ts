export class Usuario {
    constructor(
        public nombre: String,
        public email: String,
        public password: String,
        public img?: String,
        public role?: String,
        public google?: boolean,
        public _id?: String
    ) {
    }
}
