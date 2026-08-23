import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import model


class PredictValidationTests(unittest.TestCase):
    def test_invalid_image_bytes_raise_value_error(self):
        with self.assertRaises(ValueError):
            model.predict(b'not-a-valid-image', top_k=3)


if __name__ == '__main__':
    unittest.main()
