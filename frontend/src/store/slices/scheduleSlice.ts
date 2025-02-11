import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ScheduleState, BookedSlot } from '../../types/schdeule';

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

export const setCustomError = createAsyncThunk(
  'schedule/setCustomError',
  async (message: string, { rejectWithValue }) => {
    return rejectWithValue(message);
  }
);

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch booked slots
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
      // Create booked slot
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
      })
			// Set custom error
			.addCase(setCustomError.rejected, (state, action) => {
				state.error = action.payload as string || 'A apărut o eroare';
			});
  },
});

export const { clearError } = scheduleSlice.actions;
export default scheduleSlice.reducer;