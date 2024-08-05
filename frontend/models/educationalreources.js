/// Educational Resource Schema
const educationalResourceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  resourceType: {
    type: String,
    required: true,
    enum: ['video', 'article', 'quiz', 'other'],
  },
  contentUrl: {
    type: String,
  },
}, {
  timestamps: true,
});