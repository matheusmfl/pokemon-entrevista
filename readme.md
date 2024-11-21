# Pokémon Explorer

A simple, interactive Pokémon explorer that allows users to search for Pokémon by name, view detailed information, and browse through a paginated list.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture and Design](#architecture-and-design)
- [Components](#components)
- [Hooks](#hooks)
- [Styling and UI](#styling-and-ui)
- [Getting Started](#getting-started)
- [API and Data Fetching](#api-and-data-fetching)
- [Documentation for Design Choices](#documentation-for-design-choices)
- [Backend Design](#backend-design)

## Overview

The Pokémon Explorer application lets users interact with a list of Pokémon and view their details. It uses React and hooks like `useState`, `useEffect`, and `useQuery` to manage state, handle data fetching, and present information dynamically.

## Features

- **Search Pokémon**: Users can search for Pokémon by name.
- **Paginated List**: View Pokémon in a paginated format, allowing users to navigate through them with next/previous buttons.
- **Detailed Information**: Displays detailed Pokémon information such as abilities and sprites.
- **Debounced Search**: Implements a debounced search bar for better user experience.
- **Keyboard Navigation**: Users can navigate through the Pokémon list using the keyboard's arrow keys.

## Architecture and Design

### State Management

We use `useState` for managing the internal state such as:

- **Search Term**: The input value for searching Pokémon.
- **Selected Pokémon**: The currently selected Pokémon for detailed view.
- **Pagination**: Managing the offset for paginated data fetching.
- **Search Results**: Stores the Pokémon retrieved from the search query.

### Data Fetching

The data is fetched via custom hooks using React Query (`useQuery`):

- **Pokémon List**: Retrieves a list of Pokémon with pagination.
- **Pokémon Details**: Fetches detailed data for a selected Pokémon.
- **Search Pokémon**: Handles fetching of data based on the search term, and debouncing is applied to avoid unnecessary requests.

### Error Handling

If a Pokémon is not found or there is a network issue, an error message is displayed to the user.

### Key Decisions

- **React Query**: We use React Query for data fetching because of its caching, background refetching, and pagination capabilities.
- **Debouncing**: We use a custom `useDebounce` hook to improve the search experience by reducing unnecessary API calls while typing.
- **Keyboard Navigation**: The PokemonList component allows users to navigate through the list using arrow keys, improving accessibility and UX.
- **Card Layout**: The Pokémon list and details are displayed using Card components from the UI library, maintaining a clean and consistent design.

## Components

### PokemonExplorer

This component acts as the main container that manages the overall state of the Pokémon explorer, including the list, details, search, and pagination.

### PokemonList

Displays a list of Pokémon and supports:

- **Keyboard Navigation**: The user can use the arrow keys to navigate through the list.
- **Selection**: A Pokémon can be selected by clicking or pressing enter.

### PokemonDetails

Shows detailed information about a selected Pokémon:

- **Image**: Displays the front sprite of the Pokémon.
- **Abilities**: Lists the abilities of the Pokémon using badges.

### SearchBar

A search input that allows the user to search for Pokémon by name. The input value is debounced to avoid excessive API calls.

## Hooks

### usePokemons

This custom hook handles fetching the list of Pokémon with pagination. It uses the `useQuery` hook from React Query to fetch the data.

### usePokemon

Another custom hook for fetching detailed information about a specific Pokémon, including its name, abilities, and sprites.

### useDebounce

This hook debounces the search input to limit the frequency of API requests while typing.

## Styling and UI

The application is styled using Tailwind CSS. The components are modular and reusable, making it easy to scale the application or change the theme. Components like Card, Button, and Badge are used to create a consistent UI throughout the app.

### Key UI Features:

- **Card Components**: Display Pokémon details and search results in a visually appealing card layout.
- **Button Navigation**: Pagination is handled with styled buttons using Tailwind's utility classes.
- **Alert Messages**: Error and success messages are displayed using alert components that offer immediate feedback to users.

## Getting Started

### Prerequisites

- Node.js (>= 16)
- NPM or Yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/pokemon-explorer.git
