// Health Record Schema
const healthRecordSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    bloodPressure: {
      systolic: {
        type: Number,
      },
      diastolic: {
        type: Number,
      },
    },
    heartRate: {
      type: Number,
    },
    notes: {
      type: String,
    },
  }, {
    timestamps: true,
  });