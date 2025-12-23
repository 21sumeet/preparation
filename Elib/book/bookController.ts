import express, { type NextFunction, type Request, type Response } from"express";
import createHttpError from "http-errors";
import Book from "./bookModel.ts";

const createbook = async(req: Request, res: Response, next: NextFunction)=>{
    try{

    const {title , description ,author , genre  } = req.body;
    if(!title || !description ||!author||!genre){
        return next(createHttpError(400, "All fields are required"));
    }
    // if (!mongoose.Types.ObjectId.isValid(author)) {
    //   return next(createHttpError(400, "Invalid author id"));
    // }
    const files = req.files as {
      coverImage?: Express.Multer.File[];
      file?: Express.Multer.File[];
    };
    //console.log(files)
    if (!files?.coverImage || !files?.file) {
      return next(
        createHttpError(400, "Cover image and book file are required")
      );
    }
    const coverImagePath = files.coverImage[0].path;
    const bookFilePath = files.file[0].path;

    const newBook = await Book.create({
      title,
      description,
      genre,
      author,
      coverImage: coverImagePath,
      file: bookFilePath
    });

     res.status(201).json({
      message: "Book created successfully",
      book: {
        id: newBook._id,
        title: newBook.title,
        genre: newBook.genre,
        coverImage: newBook.coverImage,
        file: newBook.file
      }
    });
    }catch(err){
        next(createHttpError(500, "Error while creating books"));
    }
}

export {createbook}