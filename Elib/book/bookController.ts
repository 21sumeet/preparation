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
        console.log("CREATE BOOK ERROR:", err);
        next(createHttpError(500, "Error while creating books"));
    }
}

const updatebook = async(req: Request, res: Response, next: NextFunction)=>{
  try{
  const {id} = req.params;
  const {title , description , genre ,author} = req.body;
  //find book
  const book = await Book.findById(id);
  if(!book){
    return next(createHttpError(404, "Book not found"));
  }
   // update text fields if provided
    if (title) book.title = title;
    if (description) book.description = description;
    if (genre) book.genre = genre;
  
  // handle files (optional)
    const files = req.files as {
      coverImage?: Express.Multer.File[];
      file?: Express.Multer.File[];
    };

    if (files?.coverImage?.[0]) {
      book.coverImage = files.coverImage[0].path;
    }

    if (files?.file?.[0]) {
      book.file = files.file[0].path;
    }
    await book.save();
  
  res.status(200).json({
      message: "Book updated successfully",
      book: {
        id: book._id,
        title: book.title,
        genre: book.genre,
        coverImage: book.coverImage,
        file: book.file
      }
    });


  }catch(err){
      console.log("Update BOOK ERROR:", err);
      next(createHttpError(500, "Error while updating books"));
  }
}

export {createbook ,updatebook}