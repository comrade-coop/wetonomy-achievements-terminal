export const addPost = post => ({
  type: 'ADD_TIMELINE_POST',
  post
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const fetchRequest = post => ({
  type: 'FETCH_REQUEST',
  post
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}