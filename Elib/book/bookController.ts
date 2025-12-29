import express, { type NextFunction, type Request, type Response } from"express";
import createHttpError from "http-errors";
import Book from "./bookModel.ts";
import mongoose from "mongoose";
import fs from "node:fs";
import type { AuthRequest } from "../middleware/authMiddleware.ts";


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
    if(files.coverImage[0]==undefined ||files.file[0]==undefined){
      return next(
        createHttpError(400, "Cover image and book file are undefined")
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

const listBooks = async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const book = await Book.find();
    res.json(book);
  } catch (err) {
     console.log("GET BOOKs ERROR:", err);
      next(createHttpError(500, "Error while getting books"));
  }
}

const getSingleBook = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const {bookId} = req.params;
    const book = await Book.findById({ _id: bookId });
    if(!book){
       return next(createHttpError(404, "Book not found"));
    }
     return res.json(book);
  }catch(err){
    console.log("GET single BOOK ERROR:", err);
      next(createHttpError(500, "Error while getting book"));
  }
}

const deletebook = async(req: Request, res: Response, next: NextFunction)=>{
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return next(createHttpError(400, "Invalid book id"));
 }
 try{
  const book = await Book.findById(id);
    if (!book) {
      return next(createHttpError(404, "Book not found"));
    }
  const _req = req as AuthRequest;
  if(book.author.toString()!==_req.userId){
    createHttpError(403, "You are not allowed to delete this book")
  }
  if (book.coverImage && fs.existsSync(book.coverImage)) {
      fs.unlinkSync(book.coverImage);
    }
    if (book.file && fs.existsSync(book.file)) {
      fs.unlinkSync(book.file);
    }
    await Book.findByIdAndDelete(id);

    res.status(200).json({
      message: "Book deleted successfully",
    });
 }catch(err){
  console.log("DELETE BOOK ERROR:", err);
  next(createHttpError(500, "Error while deleting book"));
 }

}


export {createbook ,updatebook , listBooks ,getSingleBook ,deletebook}