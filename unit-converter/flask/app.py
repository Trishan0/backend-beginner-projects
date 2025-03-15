from flask import Flask, render_template, request, flash

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Required for flashing messages
app.jinja_env.auto_reload = True
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Define units with their display names
UNITS = {
    'length': {
        'cm': 'Centimeters',
        'm': 'Meters',
        'km': 'Kilometers',
        'inch': 'Inches',
        'ft': 'Feet',
        'mi': 'Miles'
    },
    'weight': {
        'kg': 'Kilograms',
        'g': 'Grams',
        'mg': 'Milligrams',
        'lb': 'Pounds',
        'oz': 'Ounces'
    },
    'temperature': {
        'C': 'Celsius',
        'F': 'Fahrenheit',
        'K': 'Kelvin'
    }
}

CONVERSION_RATES = {
    'length': {
        'cm': 0.01,
        'm': 1, #base unit
        'km': 1000,
        'inch': 0.0254,
        'ft': 0.3048,
        'mi': 1609.34,
    },
    'weight': {
        'kg': 1,  #base unit
        'g': 0.001,
        'mg': 0.000001,
        'lb': 0.453592,
        'oz': 0.0283495,
    },
    'temperature': {
    'C': 0,  #base unit
    'F': 32,
    'K': 273.15,
    }
    }
    

def get_unit_type(unit):
    for unit_type, units in UNITS.items():
        if unit in units:
            return unit_type

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            value = float(request.form.get('value'))
            from_unit = request.form.get('from_unit')
            to_unit = request.form.get('to_unit')
            print(from_unit, to_unit)
            
            # Get the unit types
            from_type = get_unit_type(from_unit)
            to_type = get_unit_type(to_unit)
            
            # Check if the unit types are the same
            if from_type != to_type:
                flash("Please select units of the same type", "error")
                return render_template('index.html', units=UNITS)
            from_rate = CONVERSION_RATES[from_type][from_unit]
            to_rate = CONVERSION_RATES[to_type][to_unit]
            converted_value = value * from_rate / to_rate
            
            return render_template('index.html', 
                                 units=UNITS,
                                 result=converted_value, 
                                 to_unit=to_unit,
                                 value=value,
                                 from_unit=from_unit)
        except (ValueError, TypeError):
            flash("Please enter a valid number", "error")
            return render_template('index.html', units=UNITS)
        except KeyError:
            flash("Invalid unit selection", "error")
            return render_template('index.html', units=UNITS)
    
    return render_template('index.html', units=UNITS)

if __name__ == '__main__':
    
    app.run(debug=True)
    
