import { TermRecord, RoomId } from '../types'
import { toSlug, deduplicateTerms } from '../utils/termUtils'

// Assignments: term slug → roomId
const roomAssignments: Record<string, RoomId> = {
  'sum': 'operations',
  'difference': 'operations',
  'product': 'operations',
  'quotient': 'operations',
  'addend': 'operations',
  'factor': 'operations',
  'estimate': 'operations',
  'round': 'operations',
  'less-than': 'operations',
  'greater-than': 'operations',
  'inequality': 'operations',

  'dividend': 'division',
  'divisor': 'division',
  'remainder': 'division',
  'minuend': 'division',
  'subtrahend': 'division',
  'algorithm': 'division',
  'array': 'division',
  'decompose': 'division',
  'compose': 'division',

  'numerator': 'fractions',
  'denominator': 'fractions',
  'proper-fraction': 'fractions',
  'improper-fraction': 'fractions',
  'mixed-number': 'fractions',
  'equivalent-fractions': 'fractions',
  'simplest-form': 'fractions',
  'simplify': 'fractions',
  'unlike-denominators': 'fractions',
  'like-denominators': 'fractions',
  'benchmark-fractions': 'fractions',
  'reciprocal': 'fractions',
  'lowest-terms': 'fractions',

  'decimal': 'decimals',
  'decimal-point': 'decimals',
  'tenth': 'decimals',
  'hundredth': 'decimals',
  'thousandth': 'decimals',
  'place-value': 'decimals',
  'standard-form': 'decimals',
  'expanded-form': 'decimals',
  'whole-numbers': 'decimals',

  'commutative-property-of-multiplication': 'properties',
  'commutative-property-of-addition': 'properties',
  'associative-property-of-multiplication': 'properties',
  'associative-property-of-addition': 'properties',
  'distributive-property': 'properties',

  'expression': 'expressions',
  'equation': 'expressions',
  'order-of-operation': 'expressions',
  'parentheses': 'expressions',
  'brackets': 'expressions',
  'braces': 'expressions',
  'evaluate': 'expressions',

  'area': 'measurement',
  'area-model': 'measurement',
  'bar-model': 'measurement',
  'centimeter': 'measurement',
  'meter': 'measurement',
  'millimeter': 'measurement',
  'metric-system': 'measurement',
  'cubic-unit': 'measurement',
  'decimeter': 'measurement',
  'number-line': 'measurement',
  'attribute': 'measurement',

  'coordinate-system': 'coordinates',
  'coordinate-plane': 'coordinates',
  'axis': 'coordinates',
  'coordinates': 'coordinates',
  'corresponding-terms': 'coordinates',
  'base-of-a-solid-figure': 'coordinates',
  'base-of-an-exponent': 'coordinates',
}

interface RawJson {
  [key: string]: string
}

const raw1: RawJson = {
  "Factor": "One of two or more expressions that are multiplied together to get a product.",
  "Commutative Property of Multiplication": "When two numbers are multiplied, the product is the same regardless of the order of the factors.",
  "area": "The number of square units that covers a shape or figure",
  "Less than": "Is used to compare two numbers when the first number is smaller than the second number",
  "addend": "Any number being added",
  "Greater than": "Is used to compare two numbers when the first number is larger than the second number",
  "Commutative Property of Addition": "When two numbers are added, the sum is the same regardless of the order of the addends.",
  "Product": "The result of two numbers being multiplied together",
  "Hundredth": "One out of one hundred equal parts; the position of the second digit to the right of the decimal point",
  "Quotient": "The answer to a division problem",
  "Dividend": "The number that is divided by another number in a division operation.",
  "Bar model": "A visual model used to solve word problems in the place of guess and check.",
  "Estimate": "A close guess of the actual value, usually with some thought or calculation involved.",
  "Tenth": "One out of ten equal parts; the position of the first digit to the right of the decimal point",
  "Order of Operation": "Is a rule used to clarify which procedures should be performed first in a given mathematical expression",
  "Difference": "The result when one number is subtracted from another",
  "Round": "A method of approximating a number to its nearest place value",
  "Divisor": "The quantity by which another quantity is to be divided",
  "centimeter": "A measure of length. There are 100 centimeters in a meter.",
  "Numerator": "The top part of a fraction",
  "Place value": "The value of where the digit is in the number",
  "Equation": "A number sentence with an equal sign. The amount on one side of the equal sign has the same value as the amount on the other side.",
  "Remainder": "The amount left over after division when one divisor does not divide the dividend exactly",
  "Decimal": "The expression of a fraction in the base of ten, using a decimal point to separate whole numbers from the fractional value.",
  "Sum": "The answer to an addition problem",
  "Thousandth": "One out of one thousand equal parts; the position of the third digit to the right of the decimal point.",
  "Meter": "The basic unit of length (or distance) in the Metric System. The abbreviation is (m).",
  "Parentheses": "The symbols ( and ) used in grouping.",
  "Number line": "A line with numbers placed in their correct position.",
  "Associative Property of Multiplication": "When three or more numbers are multiplied, the product is the same regardless of the grouping of the factors. For instance, (2X3) X4 = 2 X (3 X 4)",
  "Associative Property of Addition": "When three or more numbers are added, the sum is the same regardless of the grouping of the addends. For example, (2+3) +4 = 2 + (3+4)",
  "Expanded form": "A way to write a number that shows the sum of the values of each digit of a number. For example, 543 = 500 + 40 + 3.",
  "Millimeter": "A metric unit used to measure length. The abbreviation is (mm).",
  "Area model": "A pictorial way of representing multiplication. The length and width of a rectangle represents factors, and the area of the rectangle represents their product",
  "Expression": "A mathematical phrase without an equal sign.",
  "Standard form": "The numerical version of a number where each number has a place value.",
  "Minuend": "The starting number in a subtraction problem.",
  "Subtrahend": "The number to be subtracted from another number",
  "Unlike denominators": "Two or more fractions that do not have the same denominator.",
  "Simplify": "To express a fraction in simplest form",
  "Evaluate": "To substitute number values into an expression",
  "Proper fraction": "A fraction whose numerator is less than its denominator.",
  "Mixed number": "A number written as a whole number and a fraction.",
  "Simplest form": "When a fraction is expressed with the fewest number of pieces (also lowest term).",
  "Inequality": "A mathematical sentence that uses symbols such as < or > to compare two quantities.",
  "Equivalent fractions": "Different fractions that name the same number or amount.",
  "Whole numbers": "The set of numbers that includes zero and all of the natural numbers.",
  "Improper fraction": "A fraction in which the number in the numerator is greater than or equal to the number in the denominator.",
  "Denominator": "The bottom part of a fraction.",
  "Lowest terms": "A fraction expressed in the fewest number of pieces possible (also simplest form)",
}

const raw3: RawJson = {
  "attribute": "A characteristic of an object such as color, shape, or size",
  "decompose": "To separate into basic elements",
  "Metric system": "A system of measuring based on the meter for length",
  "Like denominators": "Denominators in two or more fractions that are the same",
  "algorithm": "Set of steps used to solve a mathematical computation",
  "reciprocal": "Multiplicative inverse - 1 divided by that number",
  "brackets": "Extra forms of parentheses when one set of parentheses is not enough to indicate all the grouping",
  "array": "An orderly arrangement in rows and columns used in multiplication and division to show how multiplication can be shown as repeated addition and division can be shown as fair shares",
  "Distributive property": "Multiply a sum by multiplying each addend separately and then add the products",
  "Benchmark fractions": "Common fractions that you can judge other numbers against",
  "Decimal point": "A printed or written dot in a decimal number that divides the whole numbers from the tenths, hundredths, and smaller divisions of ten",
  "braces": "Extra forms of parentheses when one set of parentheses and one set of brackets is not enough to indicate all the grouping",
  "compose": "To put together basic elements",
  "addend": "Any number being added",
  "Bar model": "A visual model used to solve word problems in the place of guess and check",
  "Coordinate system": "A method of representing points in a space of given dimensions by coordinates",
  "Base of a solid figure": "Usually thought of as a face upon which a solid figure can sit",
  "Corresponding terms": "Terms that are in the same position in a sequence of numbers",
  "Base of an exponent": "The number being raised to a certain power in an exponent",
  "axis": "The vertical and horizontal lines that make up the quadrants of a coordinate plane",
  "coordinates": "The pairs of numbers which specify the position or location of a point",
  "Coordinate plane": "A plane formed by the intersection of a horizontal number line with a vertical number line",
  "decimeter": "One tenth of a meter",
  "Cubic unit": "A unit for measuring volume",
}

function buildTerms(raw: RawJson): TermRecord[] {
  return Object.entries(raw).map(([displayTerm, definition]) => {
    const id = toSlug(displayTerm)
    const roomId = roomAssignments[id] ?? 'operations'
    return { id, displayTerm, definition, roomId }
  })
}

const allRaw = [...buildTerms(raw1), ...buildTerms(raw3)]
export const ALL_TERMS: TermRecord[] = deduplicateTerms(allRaw)

export function getTermById(id: string): TermRecord | undefined {
  return ALL_TERMS.find(t => t.id === id)
}

export function getTermsByRoom(roomId: string): TermRecord[] {
  return ALL_TERMS.filter(t => t.roomId === roomId)
}
