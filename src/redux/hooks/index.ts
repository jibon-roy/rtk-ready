// src/hooks/index.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

// Typed useDispatch hook for dispatching actions
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed useSelector hook for accessing state in components
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
