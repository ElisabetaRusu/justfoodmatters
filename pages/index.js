import { createClient } from 'contentful'
import RecipeCard from '../components/RecipeCard'

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: "recipe" })

  return {
    props: {
      recipes: res.items,
    },
    revalidate: 1
  }
}

export default function Recipes({ recipes }) {
  console.log(recipes)

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}

      <style jsx>{`
        .recipe-list {
          box-sizing: border-box;
          grid-gap: 20px 60px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
      `}</style>
    </div>
  )
}