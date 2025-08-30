import React from "react";
import MistralRecipe from "./MistralRecipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../ai";

export default function Main() {
  const [ingredients, setIngredients] = React.useState(() => {
    const saved = sessionStorage.getItem("ingredients");
    return saved ? JSON.parse(saved) : [];
  });

  const [recipe, setRecipe] = React.useState(() => {
    return sessionStorage.getItem("recipe") || "";
  });

  const [recipeName, setRecipeName] = React.useState("");

  const [toast, setToast] = React.useState({ message: "", type: "" });

  function showToast(message, type = "info") {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2000);
  }

  React.useEffect(() => {
    sessionStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  const recipeSection = React.useRef(null);
  React.useEffect(() => {
    sessionStorage.setItem("recipe", recipe);
  }, [recipe]);

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients, recipeName);
    setRecipe(recipeMarkdown);
    showToast("Recipe generated successfully!", "success");
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")?.trim();
    if (!newIngredient) return; // ignore empty input

    setIngredients((prevIngredients) => {
      // Check for duplicates (case-insensitive)
      if (
        prevIngredients.some(
          (item) => item.toLowerCase() === newIngredient.toLowerCase()
        )
      ) {
        showToast(`"${newIngredient}" is already in the list`, "error");
        return prevIngredients;
      }
      return [...prevIngredients, newIngredient];
    });
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  function resetRecipe() {
    setIngredients([]);
    setRecipe("");
    sessionStorage.removeItem("ingredients");
    sessionStorage.removeItem("recipe");
  }
  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);
  return (
    <main className="p-8 pt-6">
      <form action={addIngredient} className="flex justify-center gap-3 h-10">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          className="rounded-md border border-gray-300 px-3 py-2 shadow-sm flex-grow min-w-[150px] max-w-[400px]"
        />
        <button
          type="submit"
          className="rounded-md bg-gray-900 text-gray-50 w-36 text-sm font-medium cursor-pointer hover:bg-gray-800"
        >
          + Add ingredient
        </button>
        <button
          type="button"
          onClick={resetRecipe}
          className="rounded-md bg-gray-200 text-gray-900 w-40 text-sm font-medium cursor-pointer hover:bg-gray-300"
        >
          Start New Recipe
        </button>
      </form>

      {toast.message && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg animate-fade-in
      ${toast.type === "error" ? "bg-red-500 text-white" : ""}
      ${toast.type === "success" ? "bg-green-500 text-white" : ""}
    `}
        >
          {toast.message}
        </div>
      )}

      {ingredients.length ? (
        <IngredientsList
          ref={recipeSection}
          ingredients={ingredients}
          getRecipe={getRecipe}
          removeIngredient={removeIngredient}
          recipeName={recipeName}
          setRecipeName={setRecipeName}
        />
      ) : null}

      {recipe ? <MistralRecipe recipe={recipe} /> : null}
    </main>
  );
}
