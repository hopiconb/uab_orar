// scheduleSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ScheduleState, BookedSlot } from '../../types/addSchdeule';

const initialState: ScheduleState = {
  bookedSlots: [],
  isLoading: false,
  error: null,
};

export const fetchBookedSlots = createAsyncThunk(
  'schedule/fetchBookedSlots',
  async () => {
    const response = await fetch('/api/booked-slots');
    if (!response.ok) {
      throw new Error('Failed to fetch booked slots');
    }
    return response.json();
  }
);

export const createBookedSlot = createAsyncThunk(
  'schedule/createBookedSlot',
  async (newSlot: Omit<BookedSlot, 'id'>) => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSlot),
    });
    if (!response.ok) {
      throw new Error('Failed to create booked slot');
    }
    return response.json();
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCustomError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookedSlots.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookedSlots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookedSlots = action.payload;
      })
      .addCase(fetchBookedSlots.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'A apărut o eroare';
      })
      .addCase(createBookedSlot.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBookedSlot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookedSlots.push(action.payload);
      })
      .addCase(createBookedSlot.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'A apărut o eroare la salvare';
      });
  },
});

export const { clearError, setCustomError } = scheduleSlice.actions;
export default scheduleSlice.reducer;