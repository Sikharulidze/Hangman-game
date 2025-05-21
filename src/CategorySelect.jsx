function CategorySelect({ categories, onSelectCategory, onBack }) {
  return (
    <div>
      <h2>Pick a Category</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.name}>
            <button onClick={() => onSelectCategory(cat)}>{cat.name}</button>
          </li>
        ))}
      </ul>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default CategorySelect;
