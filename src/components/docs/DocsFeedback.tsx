import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const DocsFeedback = () => {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Handle feedback submission
    setSubmitted(true);
    setTimeout(() => {
      setFeedback(null);
      setComment("");
      setSubmitted(false);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="text-sm text-muted-foreground text-center py-4">
        Thank you for your feedback!
      </div>
    );
  }

  if (feedback === null) {
    return (
      <div>
        <h3 className="text-sm font-semibold mb-4 text-foreground">Quick Feedback</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setFeedback("positive")}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Helpful
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => setFeedback("negative")}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            Not helpful
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-semibold mb-4 text-foreground">Quick Feedback</h3>
      <div className="space-y-3">
        <Textarea
          placeholder="What can we improve?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[80px] text-sm"
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFeedback(null);
              setComment("");
            }}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocsFeedback;
