import { pool } from './database.js';

class LibroController {
  async getAll(req, res) {
    try {
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la lista de libros' });
    }
  }

  async add(req, res) {
    const libro = req.body;
    try {
      const [result] = await pool.query(
        `INSERT INTO Libros(nombre, autor, categoria, anio_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`,
        [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]
      );
      res.json({ "Id insertado": result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al insertar el libro' });
    }
  }

  async delete(req, res) {
    const libro = req.body;
    try {
      const [result] = await pool.query(`DELETE FROM Libros WHERE ISBN=(?)`, [libro.ISBN]);
      res.json({ "registros eliminados": result.affectedRows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el libro' });
    }
  }

  async update(req, res) {
    const libro = req.body;
    try {
      const [result] = await pool.query(
        `UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), ISBN=(?) WHERE id=(?)`,
        [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, libro.id]
      );
      res.json({ "registros actualizados": result.changedRows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el libro' });
    }
  }
}

export const libro = new LibroController();
