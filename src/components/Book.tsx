"use client";

import Image from "next/image";
import { bookAction } from "./book-action";
import { useFormState } from "react-dom";

export function Book({
  id,
  name,
  description,
  coverUrl,
  isLoggedIn,
  status,
  userRating,
  genre,
}: {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  isLoggedIn: boolean;
  status?: string;
  userRating?: number;
  genre: string;
}) {
  const [formStatus, formAction] = useFormState(bookAction, { message: "" });
  return (
    <div className="flex flex-row gap-2 items-center justify-between w-full">
      <div className="flex-row justify-start items-center gap-2 w-full flex-shrink">
        <h5 className="text-lg">{name}</h5>
        <p className="text-gray-300">
          {description.slice(0, 30) + (description.length >= 30 ? "..." : "")}
        </p>
        <p>{genre}</p>
      </div>
      <div className="flex flex-row justify-end items-center gap-2 w-full">
        {isLoggedIn && (
          <form data-cy="shelf-form" action={formAction} className="flex gap-2">
            <input type="hidden" name="bookId" value={id} />

            <label htmlFor="score">Rate: </label>
            <input
              className="text-black"
              name="rating"
              type="number"
              min={0}
              max={5}
              value={userRating}
            />

            <select className="text-black" name="status">
              <option value="">Select status</option>
              <option value="haveRead" selected={status === "haveRead"}>
                Have read
              </option>
              <option
                value="currentlyReading"
                selected={status === "currentlyReading"}
              >
                Currently reading
              </option>
              <option value="wantToRead" selected={status === "wantToRead"}>
                Want to read
              </option>
            </select>
            <button
              type="submit"
              data-cy="submit-status"
              className="bg-green-600"
            >
              Save
            </button>
            {formStatus?.message && <p>{formStatus.message}</p>}
          </form>
        )}
        <Image src={coverUrl} alt={name} width={100} height={150} />
      </div>
    </div>
  );
}
