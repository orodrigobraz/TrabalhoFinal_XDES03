class Livro{

    constructor(id, titulo, autor, editora, pagnum, img, userId){

        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.pagnum = pagnum;
        this.img = img;
        this.userId = userId;
    }
}
module.exports = Livro;