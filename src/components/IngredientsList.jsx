import React from "react";

const IngredientsList = React.forwardRef((props, ref) => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2">Ingredients on hand:</h2>
      <ul
        className="mb-12 list-disc pl-5 grid gap-x-16 gap-y-2"
        style={{
          gridTemplateColumns: "repeat(3, max-content)", // tightly packed columns
          justifyContent: "start", // align grid to the left
        }}
        aria-live="polite"
      >
        {props.ingredients.map((ingredient, index) => (
          <li
            key={ingredient}
            className="text-gray-600 leading-7 list-disc"
            style={{
              gridRow: (index % 6) + 1, // ensures max 6 rows
              gridColumn: Math.floor(index / 6) + 1, // moves to next column after 6 items
            }}
          >
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 shadow-sm">
              <span>{ingredient}</span>
              <button
                onClick={() => props.removeIngredient(ingredient)}
                className="ml-2 text-red-500 hover:text-red-700 font-bold"
                aria-label={`Remove ${ingredient}`}
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>

      {props.ingredients.length > 3 ? (
        <div className="flex justify-between items-center rounded-lg bg-[#f0efeb] px-7 py-5">
          <div ref={ref}>
            <h3 className="text-lg font-medium leading-6">
              Ready for a recipe?
            </h3>
            <p className="text-gray-500 text-sm leading-5">
              Generate a recipe from your list of ingredients.
            </p>
          </div>
          <input
            type="text"
            placeholder="Enter a recipe name (optional)"
            value={props.recipeName}
            onChange={(e) => props.setRecipeName(e.target.value)}
            className="sm:w-1/3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#d17557] bg-white"
          />
          <button
            onClick={props.getRecipe}
            className="rounded-md bg-[#d17557] text-[#fafaf8] px-4 py-2 text-sm shadow-sm
            cursor-pointer hover:bg-[#b85f44] transition-colors duration-200"
          >
            Get a recipe
          </button>
        </div>
      ) : null}
    </section>
  );
});

export default IngredientsList;
