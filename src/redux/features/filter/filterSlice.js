import {createSlice} from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name:"filters",
  initialState:{
    skill:[]
  },
  reducers:{
    setAll:(state,action)=>{
      state.skill = action.payload;
    },
    filterSkill:(state,action)=>{
      const {skills,category} = action.payload;
      const filter = skills.filter((item)=> item.category === category);
      state.skill = filter;
    },
  }
})
export const {filterSkill,setAll} = filterSlice.actions;
export default filterSlice.reducer;